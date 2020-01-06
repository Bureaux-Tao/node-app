<template>
	<div class="infoshow">
		<el-row type="flex" class="row-bg" justify="center">
			<el-col :span="6" class="user-container">
				<div class="user">
					<img :src="user.avatar" class="avatar" alt="" />
				</div>
			</el-col>
			<el-col :span="16">
				<div class="userinfo">
					<div class="user-item">
						<i class="fa fa-user"></i>
						<span class="user-word">{{ user.name }}</span>
					</div>
					<div class="user-item">
						<i class="fa fa-cog"></i>
						<span class="user-word">{{
							user.identity == "manager" ? "管理员" : "普通员工"
						}}</span>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: "infoshow",
	computed: {
		user() {
			return this.$store.getters.user;
		}
	}
};
</script>

<style lang="scss" scoped>
.infoshow {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	// padding: 150px; 
}
.row-bg {
	width: 100%;
	height: 100%;
}
.user-container {
	display: flex; 
    justify-content: center;
    align-items: center;
}
.user {
	text-align: center;
	// align-self:center;
	position: relative;
	// top: 30%;
	// margin-left: 20px
}
.user img {
	width: 150px;
	border-radius: 50%;
}
.user span {
	display: block;
	text-align: center;
	margin-top: 20px;
	font-size: 20px;
	font-weight: bold;
}
.userinfo {
	display: flex; 
    justify-content: center;
    align-items: flex-start;
	height: 100%;
	background-color: #eee;
    margin-left: 10px;
	// margin-top: 50px;
	flex-direction:column;
}
.user-item {
	// position: relative;
	// top: 30%;
	padding: 26px;
	font-size: 28px;
	color: #333;
}
.user-word {
    margin-left: 15px;
}
</style>
