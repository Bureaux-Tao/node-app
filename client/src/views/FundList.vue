<template>
	<div class="fillcontain">
		<div class="table-container">
			<el-table
				:data="tableData"
				max-height="600"
				border
				:default-sort="{ prop: 'date', order: 'descending' }"
				style="width: 100%"
				v-if="tableData.length > 0"
			>
				<el-table-column
					type="index"
					label="序号"
					align="center"
					width="70"
				></el-table-column>
				<el-table-column label="创建时间" width="220" prop="date">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span style="margin-left: 10px">{{
							scope.row.date
						}}</span>
					</template>
				</el-table-column>
				<el-table-column
					label="收支类型"
					align="center"
					width="150"
					prop="type"
				></el-table-column>
				<el-table-column
					label="收支表述"
					align="center"
					width="150"
					prop="describe"
				></el-table-column>
				<el-table-column
					label="收入金额"
					align="center"
					width="120"
					prop="income"
				>
					<template slot-scope="scope">
						<span style="color:#00d053"
							>+ {{ scope.row.income }}</span
						>
					</template>
				</el-table-column>
				<el-table-column
					label="支出金额"
					align="center"
					width="120"
					prop="expend"
				>
					<template slot-scope="scope">
						<span style="color:#f56767"
							>- {{ scope.row.expend }}</span
						>
					</template>
				</el-table-column>
				<el-table-column
					label="账户现金"
					align="center"
					width="120"
					prop="cash"
				>
					<template slot-scope="scope">
						<span style="color:#4db3ff">{{ scope.row.cash }}</span>
					</template>
				</el-table-column>
				<el-table-column
					label="备注"
					width="230"
					prop="remark"
				></el-table-column>
				<el-table-column label="操作" prop="operation" align="center">
					<template slot-scope="scope">
						<el-button
							size="small"
							:disabled="
								(user.identity == 'manager') == false
									? true
									: false
							"
							type="warning"
							icon="delete"
							@click="handleEdit(scope.$index, scope.row)"
							>编辑</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="delete"
							:disabled="
								(user.identity == 'manager') == false
									? true
									: false
							"
							@click="handleDelete(scope.$index, scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div>
			<el-row>
				<el-col :span="14">
					<el-form :inline="true" ref="add_data" :model="search_data">
						<el-form-item class="btnRight">
							<el-button
								:disabled="
									(user.identity == 'manager') == false
										? true
										: false
								"
								type="primary"
								@click="handleAdd()"
								icon="view"
								size="medium"
								round
								>添加资金信息</el-button
							>
						</el-form-item>
						<el-form-item label="筛选:" class="filter">
							<el-date-picker
								v-model="search_data.startTime"
								class="p1"
								size="small"
								type="datetime"
								style="width:200px; margin-right:3px"
								placeholder="选择开始时间"
							/>--
							<el-date-picker
								v-model="search_data.endTime"
								type="datetime"
								size="medium"
								style="width:200px;margin-right:10px"
								placeholder="选择结束时间"
							/>
							<el-form-item>
								<el-button
									type="primary"
									size="small"
									round
									icon="search"
									@click="handleSearch()"
									>筛选</el-button
								>
							</el-form-item>
						</el-form-item>
					</el-form></el-col
				>

				<el-col :span="5">
					<div class="pagination">
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page.sync="paginations.page_index"
							:page-sizes="paginations.page_sizes"
							:page-size="paginations.page_size"
							:layout="paginations.layout"
							:total="paginations.total"
						>
						</el-pagination>
					</div>
				</el-col>
			</el-row>
		</div>
		<Dialog
			:dialog="dialog"
			:formData="formData"
			@update="getProfile"
		></Dialog>
	</div>
</template>

<script>
import Dialog from "../components/Dialog";
export default {
	name: "fundList",
	computed: {
		user() {
			return this.$store.getters.user;
		}
	},
	data() {
		return {
			paginations: {
				page_index: 1, // 当前位于哪页
				total: 0, // 总数
				page_size: 5, // 1页显示多少条
				page_sizes: [5, 10, 15, 20], //每页显示多少条
				layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
			},
			formData: {
				type: "",
				describe: "",
				income: "",
				expend: "",
				cash: "",
				remark: "",
				id: ""
			},
			tableData: {},
			allTableData: [],
			search_data: {
				startTime: "",
				endTime: ""
			},
			filterTableData: [],
			dialog: {
				show: false,
				title: "",
				option: "edit"
			}
		};
	},
	created() {
		this.getProfile();
	},
	methods: {
		getProfile() {
			this.$axios
				.get("/api/profiles")
				.then(res => {
					this.allTableData = res.data;
					console.log(res.data)
					this.filterTableData = res.data;
					for (var i in this.allTableData) {
						// console.log(this.dateFormat("YYYY-mm-dd HH:MM", new Date(Date.parse(this.allTableData[i].date))))
						this.allTableData[i].date=this.dateFormat("YYYY-mm-dd  HH:MM:SS", new Date(Date.parse(this.allTableData[i].date)))
					}
					for (var i in this.filterTableData) {
						// console.log(this.dateFormat("YYYY-mm-dd HH:MM", new Date(Date.parse(this.allTableData[i].date))))
						this.filterTableData[i].date=this.dateFormat("YYYY-mm-dd  HH:MM:SS", new Date(Date.parse(this.allTableData[i].date)))
					}
					//设置分页数据
					this.setPaginations();
				})
				.catch(err => {
					console.error(err);
				});
		},
		setPaginations() {
			//分页属性设置
			// 总页数
			this.paginations.total = this.allTableData.length;
			this.paginations.page_index = 1;
			this.paginations.page_size = 5;
			// 设置默认分页数据
			this.tableData = this.allTableData.filter((item, index) => {
				return index < this.paginations.page_size;
			});
		},
		handleEdit(index, row) {
			// alert("edit")
			this.formData = row;
			this.formData.id = row._id;
			console.log("TCL: handleEdit -> this.formData", this.formData);
			this.dialog = {
				show: true,
				title: "修改资金信息",
				option: "edit"
			};
		},
		handleDelete(index, row) {
			// alert("delete")
			this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
				this.$message({
					message: "删除成功",
					type: "success"
				});
				this.getProfile();
			});
		},
		handleAdd() {
			// alert("add")
			this.dialog = {
				show: true,
				title: "添加资金信息",
				option: "add"
			};
			this.formData = {
				type: "",
				describe: "",
				income: "",
				expend: "",
				cash: "",
				remark: "",
				id: ""
			};
		},
		handleSizeChange(page_size) {
			// 切换size
			this.paginations.page_index = 1;
			this.paginations.page_size = page_size;
			this.tableData = this.allTableData.filter((item, index) => {
				return index < page_size;
			});
		},
		handleCurrentChange(page) {
			let index = this.paginations.page_size * (page - 1); //获取当前页
			let nums = this.paginations.page_size * page; //数据总数
			let tables = [];
			for (let i = index; i < nums; i++) {
				if (this.allTableData[i]) {
					tables.push(this.allTableData[i]);
				}
				this.tableData = tables;
			}
		},
		handleSearch() {
			if (!this.search_data.startTime || !this.search_data.endTime) {
				this.$message({
					type: "warning",
					message: "请选择时间区间"
				});
				this.getProfile();
				return;
			}
			const sTime = this.search_data.startTime.getTime();
			const eTime = this.search_data.endTime.getTime();
			this.allTableData = this.filterTableData.filter(item => {
				let date = new Date(item.date);
				let time = date.getTime();
				return time >= sTime && time <= eTime;
			});
			// 分页数据
			this.setPaginations();
		},
		dateFormat(fmt, date) {
			let ret;
			let opt = {
				"Y+": date.getFullYear().toString(), // 年
				"m+": (date.getMonth() + 1).toString(), // 月
				"d+": date.getDate().toString(), // 日
				"H+": date.getHours().toString(), // 时
				"M+": date.getMinutes().toString(), // 分
				"S+": date.getSeconds().toString() // 秒
				// 有其他格式化字符需求可以继续添加，必须转化成字符串
			};
			for (let k in opt) {
				ret = new RegExp("(" + k + ")").exec(fmt);
				if (ret) {
					fmt = fmt.replace(
						ret[1],
						ret[1].length == 1
							? opt[k]
							: opt[k].padStart(ret[1].length, "0")
					);
				}
			}
			return fmt;
		}
	},
	components: {
		Dialog
	}
};
</script>

<style lang="scss" scoped>
.fillcontain {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}
.pagination {
	text-align: right;
	margin: 25px;
}
.btnRight {
	margin-top: 20px;
	margin-left: 35px;
}
.filter {
	font-weight: bold;
	margin-top: 20px;
	margin-left: 60px;
}
</style>
