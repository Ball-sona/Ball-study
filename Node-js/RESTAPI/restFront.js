function getUser(){
    var xhr = new XMLHttpRequest();
    //XMLHttpRequest.onload = callback;
    xhr.onload = function(){
        if(xhr.status === 200){
            var users = JSON.parse(xhr.responseText);
            var list = document.getElementById('list');
            list.innerHTML='';
            //Object.keys(users)는 users라는 객체의 key들만 담은 배열을 반환
            Object.keys(users).map(function(key){
                var userDiv = document.createElement('div');
                var span = document.createElement('span');
                span.textContent = users[key];
                var edit = document.createElement('button');
                edit.textContent='수정';
                edit.addEventListener('click',function(){
                    var name = prompt('바꿀 이름을 입력하세요');
                    if(!name){
                        return alert('이름 반드시 입력하셈.');
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if(xhr.status === 200){
                            console.log(xhr.responseText);
                            getUser();
                        } else{
                            console.error(xhr.responseText);
                        }
                    };
                    //The XMLHttpRequest method open() initializes a newly-created request, or re-initializes an existing one.
                    xhr.open('PUT',`/users/${key}`);
                    xhr.setRequestHeader('Content-Type','application/json');
                    xhr.send(JSON.stringify({name:name}));
                })
                var remove = document.createElement('button');
                remove.textContent='삭제';
                remove.addEventListener('click',function(){
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if(xhr.status === 200){
                            console.log(xhr.responseText);
                            getUser();
                        } else{
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('DELETE',`/users/${key}`);
                    xhr.send();
                });
                userDiv.appendChild(span);
                userDiv.appendChild(edit);
                userDiv.appendChild(remove);
                list.appendChild(userDiv);
            });
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.open('GET','/users');
    xhr.send();
}
//window 로딩시 getUser를 호출 
window.onload = getUser;
// 폼 제출
document.getElementById('form').addEventListener('submit',function(e){
    e.preventDefault();
    var name= e.target.username.value;
    if(!name){
        return alert('이름 입력하셈.');
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 201){
            console.log(xhr.responseText);
            getUser();
        } else{
            console.error(xhr.responseText);
        }
    };
    xhr.open('POST','/users');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({name:name}));
    e.target.username.value="";
});