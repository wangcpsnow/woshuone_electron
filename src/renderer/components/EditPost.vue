<template>
    <div class="edit">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
        </el-breadcrumb>
        <h2 class="title">{{post.post_title}}</h2>
        <p class="author">作者: {{post.author}}</p>
        <mavon-editor v-model="post_content"></mavon-editor>
        <div>
            <el-button @click='click_cancel'>取消</el-button>
            <el-button type="primary" @click='click_save'>保存</el-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import mavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    Vue.use(mavonEditor);

    export default {
        data() {
            return {
                post: '',
                post_content: '',
                id: ''
            }
        },
        created() {
            this.id = this.$route.params.id;
            this.getData();
        },
        methods: {
            getData() {
                this.$http.get(`/posts?ID=${this.id}`)
                    .then(res => {
                        this.post = res.data[0];
                        this.post_content = res.data[0]['post_content'];
                    });
            },
            click_cancel() {
                this.$router.push('/');
            },
            click_save() {
                this.$http.put(`/posts/${this.id}`, {
                        post_content: this.post_content
                    })
                    .then(res => {
                        this.$toast('编辑保存成功');
                    })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .edit {
        padding: 15px 0;
        .title {
            margin: 15px 0 0;
        }
        .author {
            color: #908d8d;
            margin-top: 6px;
            font-size: 14px;
        }
        .el-breadcrumb {
            margin-bottom: 20px;
        }
        .el-button {
            margin-top: 20px;
        }
    }
</style>