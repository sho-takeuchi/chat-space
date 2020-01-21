$(function(){

  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class=chat-main__message-list__messages=${message.id}>
          <div class=chat-main__message-list__messages__upper-info>
            <div class=chat-main__message-list__messages__upper-info__talker>
              ${message.user_name}
            </div>
            <div class=chat-main__message-list__messages__upper-info__date>
              ${message.created_at}
            </div>
          </div>
          <div class=chat-main__message-list__messages__text>
            <p class=chat-main__message-list__messages__text__content>
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    }
     else {
      var html =
       `<div class=chat-main__message-list__messages=${message.id}>
          <div class=chat-main__message-list__messages__upper-info>
            <div class=chat-main__message-list__messages__upper-info__talker>
              ${message.user_name}
            </div>
            <div class=chat-main__message-list__messages__upper-info__date>
              ${message.created_at}
            </div>
          </div>
          <div class=chat-main__message-list__messages__text>
            <p class=chat-main__message-list__messages__text__content>
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
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
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };
});