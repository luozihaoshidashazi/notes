Vue.component('note',{
    props:['todo'],
    template:
        `<div class="ui card">
        <div class="content">
            <div class="header">{{fun || '新建笔记'}}</div><!--判断：没有标题时显示-->
            <div class="meta">
                <span>发布时间：{{createDate}}</span>
                <p>{{todo.title.length}}字</p>
            </div>
            <textarea rows="5" v-model="todo.title" @keyup="uploadNte" placeholder="请输入您的文字："></textarea>
            <i class="trash alternate outline icon" title="删除笔记" id="pic" @click="del"></i>
        </div>
    </div>`,
    computed:{
        fun:function() {
            return _.truncate(this.todo.title, {'length': 13});//获取标题长度
           /* var s = this.todo.title.length;
            if(s>=10){
                return  this.todo.title.substring(0,10)+"..."
            }else {
                return this.todo.title
            }*/
        },
        getTime:function(){
            return Date.parse(new Date());//时间戳
        },
        createDate:function(){
            return moment(this.todo.time).fromNow();//格式化时间戳
        }
    },
    methods:{
        uploadNte:function(){
            box.notes[this._uid - 1].title = this.todo.title;
            box.notes[this._uid -1].time = this.getTime;

            localStorage.setItem('notes',JSON.stringify(box.notes))
        },
        del:function(){
            box.notes.splice(this._uid -1,1);
            localStorage.setItem('notes',JSON.stringify(box.notes))
        }
    }
});


var box = new Vue({
    el:'#box',
    data:{
        notes:[
            { "title":"hello","time":1537860634000},
            {"title":"暗透了才有星光，向死而生。","time":1537860634000}
        ]
    },
    methods:{
        add:function(){/*添加到上一个*/
            this.notes.unshift({"title":"","time": Date.parse(new Date())});
            document.querySelector("textarea").focus();

            //把当前数组储存到本地
            localStorage.setItem("notes",JSON.stringify(this.notes));//转化为JSON字符串
            console.log(JSON.parse(localStorage.getItem("notes")));//之前存储的JSON字符串先转成JSON对象再进行操作
        }
    },
    created:function(){//生命周期，刷新数据还在
        if(localStorage.getItem("notes") !==null){
            this.notes = JSON.parse(localStorage.getItem("notes"));
        }
    }
});



//多行文本框内容自动适应
autosize(document.querySelectorAll('textarea'));
