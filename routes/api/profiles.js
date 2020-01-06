const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const passport = require("passport");

// $router GET api/profiles/test
// @decs 返回的请求的json数据
// @access public

router.get("/test", (req, res) => {
	res.json({ msg: "profile works " });
});

// $router POST api/profiles/add
// @decs 增
// @access private
router.post(
	"/add",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const profileFields = {};

		if (req.body.type) profileFields.type = req.body.type;
		if (req.body.describe) profileFields.describe = req.body.describe;
		if (req.body.income) profileFields.income = req.body.income;
		if (req.body.expend) profileFields.expend = req.body.expend;
		if (req.body.cash) profileFields.cash = req.body.cash;
		if (req.body.remark) profileFields.remark = req.body.remark;

		new Profile(profileFields).save().then(profile => {
			res.json(profile);
		});
	}
);

// $router GET api/profiles/
// @decs get all data
// @access public
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.find()
			.then(profile => {
				if (!profile) {
					return res.status(404).json("没有任何内容");
				}

				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
	}
);

// $router GET api/profiles/:id
// @decs get single data
// @access public
router.get(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ _id: req.params.id })
			.then(profile => {
				if (!profile) {
					return res.status(404).json("没有任何内容");
				}

				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
	}
);

// $router POST api/profiles/edit
// @decs 改
// @access private
router.post(
	"/edit/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const profileFields = {};

		if (req.body.type) profileFields.type = req.body.type;
		if (req.body.describe) profileFields.describe = req.body.describe;
		if (req.body.income) profileFields.income = req.body.income;
		if (req.body.expend) profileFields.expend = req.body.expend;
		if (req.body.cash) profileFields.cash = req.body.cash;
		if (req.body.remark) profileFields.remark = req.body.remark;

		Profile.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: profileFields },
			{ new: true }
		).then(profile => {
			// res.json(profile)
			profile.save().then(profile => res.json(profile));
		});
	}
);

// @route  POST api/profiles/delete/:id
// @desc   删除信息接口
// @access Private
router.delete(
	"/delete/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// Profile.findOneAndRemove({ _id: req.params.id })
		//   .then(profile => {
		//     profile
		// 		// .save()
		// 		// .then(profile => res.json(profile))
		// 		// .catch(err => res.json(err));
		//     // profile => res.json(profile)
		//   })
        //   .catch(err => res.status(404).json('删除失败!'));

        // Profile.remove({ _id: req.params.id }, (err, docs) => {
		// 	if (err) {
		// 		res.status(500).send();
		// 		return;
		// 	}
		// 	res.json({ statu: 200 });
		// });
        Profile.deleteOne({ _id: req.params.id })
			.then(profile => res.json({msg:profile}))
			.catch(err => res.status(404).json("删除失败!"));;
	}
);

module.exports = router;
