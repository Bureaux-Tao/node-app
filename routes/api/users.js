const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport=require("passport")

// $router GET api/users/test
// @decs 返回的请求的json数据
// @access public

router.get("/test", (req, res) => {
	res.json({ msg: "login works " });
});

// $router POST api/users/regester
// @decs 返回的请求的json数据
// @access public

router.post("/register", (req, res) => {
	console.log(req.body);

	//查询数据库中是否拥有邮箱
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json("邮箱已被注册!");
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: "200",
				r: "pg",
				d: "mm"
			});
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password,
				identity: req.body.identity
			});

			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;

					newUser.password = hash;

					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

// $router POST api/users/login
// @decs 返回passport-jwt 验证 token
// @access public

router.post("/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	//查询数据库
	User.findOne({ email }).then(user => {
		if (!user) {
			return res.status(404).json("用户不存在！" );
		}

		//密码匹配
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				const rule = {
					id: user.id,
					name: user.name,
					avatar: user.avatar,
					identity: user.identity
				};
				jwt.sign(
					rule,
					keys.secretOrKey,
					{ expiresIn: 86400 },
					(err, token) => {
						if (err) throw err;
						res.json({
							success: true,
							token: "Bearer "+token
						});
					}
				);
				// res.json({msg:"success"})
			} else {
				return res.status(400).json("密码错误！" );
			}
		});
	});
});

// $router GET api/users/current
// @decs return current user
// @access private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    // res.json({msg:"success"}) 
    res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email,
		identity: req.user.identity
	});
})

module.exports = router;
