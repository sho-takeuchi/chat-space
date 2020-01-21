$(function(){

  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="chat-main__message-list__messages" data-message-id=${message.id} >
                    <div class="chat-main__message-list__messages__upper-info"> 
                      <div class="chat-main__message-list__messages__upper-info__talker"> 
                        ${message.user_name} 
                      </div> 
                      <div class="chat-main__message-list__messages__upper-info__date"> 
                        ${message.created_at} 
                      </div> 
                    </div> 
                    <div class="chat-main__message-list__messages__text"> 
                      <p class="chat-main__message-list__messages__text__content">
                        ${message.content} 
                      </p> 
                      <img src=${message.image} class="lower-message__image" >
                    </div> 
                  </div>`
    } 
    else if (message.content) {
      var html = `<div class="chat-main__message-list__messages" data-message-id=${message.id}>
                    <div class="chat-main__message-list__messages__upper-info">
                      <div class="chat-main__message-list__messages__upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-list__messages__upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-list__messages__text">
                      <p class="chat-main__message-list__messages__text__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    } 
    else if (message.image) {
      var html = `<div class="chat-main__message-list__messages" data-message-id=${message.id}>
                    <div class="chat-main__message-list__messages__upper-info">
                      <div class="chat-main__message-list__messages__upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-list__messages__upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-list__messages__text">
                      <img src=${message.image} "class="lower-message__image">
                    </div>
                  </div>`
    };
    return html;
  };  

  $('#new_message').on('submit', function(e){  
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.chat-main__message-list').append(html);    
       $('#new_message')[0].reset();
       $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
       $('.submit-btn').prop('disabled', false);
     })
     .fail(function() {
      alert("メッセージ送信に失敗しました");
     });
  });

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("エラーです");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});