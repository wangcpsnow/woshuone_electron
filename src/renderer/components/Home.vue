<template>
    <div class="home">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="posts" border style="width: 100%;"
            :default-sort = "{prop: 'post_modified', order: 'descending'}"
            v-loading="loading"
            >
            <el-table-column prop="post_modified" sortable label="日期" width="180" :formatter='fmtDate'></el-table-column>
            <el-table-column prop="post_title" label="标题"></el-table-column>
            <el-table-column prop="author" sortable label="作者" width="120"></el-table-column>
            <el-table-column label="操作" width='180'>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="deleDialog" width="30%" title='提示'>
            <span>确认要删除该文章吗?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleDialog = false">取 消</el-button>
                <el-button type="primary" @click='click_deledialog_ok'>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {parseTime} from '../filter'

    export default {
        data() {
            return {
                posts: [],
                deleDialog: false,
                loading: true,
                deleId: ''
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                this.$http.get('/posts?post_status=publish')
                    .then(res => {
                        this.posts = res.data;
                        this.loading = false;
                    });
            },
            handleEdit(index, row) {
                this.$router.push(`/edit/${row.ID}`);
            },
            handleDelete(index, row) {
                this.deleId = row.ID;
                this.deleDialog = true;
            },
            // 弹框确认删除
            click_deledialog_ok() {
                if (!this.deleId) {
                    this.$toast('操作失败,请重试!', 'warning');
                    this.deleDialog = false;
                    return;
                }
                this.$http.delete(`/posts/${this.deleId}`)
                    .then(res => {
                        this.getList();
                        this.$toast('删除成功');
                        this.deleDialog = false;
                    });
            },
            fmtDate(row, column) {
                var date = row.post_modified;
                return parseTime(date);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .home {
        padding: 15px 0;
        .el-table {
            margin-top: 20px;
        }
    }
</style>