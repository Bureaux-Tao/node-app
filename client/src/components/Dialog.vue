<template>
	<div class="dialog">
		<el-dialog
			:title="dialog.title"
			:visible.sync="dialog.show"
			width="30%"
			:close-on-click-modal="false"
			:close-on-press-escape="true"
			:append-to-body="false"
		>
			<div class="form">
				<el-form
					ref="form"
					:model="formData"
					:rules="form_rules"
					label-width="90px"
					style="margin:15px;width:auto;"
				>
					<el-form-item label="收支类型" prop="type">
						<el-select
							v-model="formData.type"
							placeholder="收支类型"
						>
							<el-option
								v-for="(formtype, index) in format_type_list"
								:key="index"
								:label="formtype"
								:value="formtype"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="describe" label="收支描述:">
						<el-input
							type="describe"
							v-model="formData.describe"
						></el-input>
					</el-form-item>

					<el-form-item prop="income" label="收入:">
						<el-input
							type="income"
							v-model.number="formData.income"
						></el-input>
					</el-form-item>

					<el-form-item prop="expend" label="支出:">
						<el-input
							type="expend"
							v-model.number="formData.expend"
						></el-input>
					</el-form-item>

					<el-form-item prop="cash" label="账户现金:">
						<el-input
							type="cash"
							v-model.number="formData.cash"
						></el-input>
					</el-form-item>

					<el-form-item label="备注:">
						<el-input
							type="textarea"
							v-model="formData.remark"
						></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer">
				<el-button @click="dialog.show = false">取 消</el-button>
				<el-button type="primary" @click="onSubmit('form')"
					>确 定</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "dialog",
	props: {
		dialog: Object,
		formData: Object
	},
	data() {
		return {
			format_type_list: [
				"现金",
				"支付宝",
				"微信支付",
				"银联",
				"Paypal",
				"Apple Pay",
				"VISA/MASTER",
				"比特币",
				"莱特币"
			],
			form_rules: {
				type: [
					{
						required: true,
						message: "收支类型必须选择！",
						trigger: "change"
					}
				],
				describe: [
					{
						required: true,
						message: "收支描述不能为空！",
						trigger: "blur"
					}
				],
				income: [
					{
						required: true,
						message: "收入不能为空！",
						trigger: "blur"
					},
					{
						type: "number",
						message: "请填写数字！"
					}
				],
				expend: [
					{
						required: true,
						message: "支出不能为空！",
						trigger: "blur"
					},
					{
						type: "number",
						message: "请填写数字！"
					}
				],
				cash: [
					{
						required: true,
						message: "支出不能为空！",
						trigger: "blur"
					},
					{
						type: "number",
						message: "请填写数字！"
					}
				]
			}
		};
	},
	methods: {
		onSubmit(form) {
			this.$refs[form].validate(status => {
				if (status) {
					// console.log("TCL: onSubmit -> status", this.formData)
					if (this.dialog.option == "add") {
						this.$axios
							.post("api/profiles/add", this.formData)
							.then(res => {
								console.log(res);
								this.$message({
									message: "添加成功",
									type: "success"
								});
								this.dialog.show = false;
								this.$emit("update");
							})
							.catch(err => {
								console.error(err);
							});
					} else if(this.dialog.option == "edit") {
                        this.$axios
							.post(`api/profiles/edit/${this.formData.id}`, this.formData)
							.then(res => {
								console.log(res);
								this.$message({
									message: "修改成功",
									type: "success"
								});
								this.dialog.show = false;
								this.$emit("update");
							})
							.catch(err => {
								console.error(err);
							});
                    }
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.dialog {
	font-weight: bold;
}
</style>
