package routers

import (
	"github.com/astaxie/beego"
)

func init() {

	beego.GlobalControllerRouter["rwapi/controllers:CommandController"] = append(beego.GlobalControllerRouter["rwapi/controllers:CommandController"],
		beego.ControllerComments{
			"Exec",
			`/:id`,
			[]string{"post"},
			nil})

	beego.GlobalControllerRouter["rwapi/controllers:CounterController"] = append(beego.GlobalControllerRouter["rwapi/controllers:CounterController"],
		beego.ControllerComments{
			"GetCounter",
			`/counter/:id`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwapi/controllers:StatusControllers"] = append(beego.GlobalControllerRouter["rwapi/controllers:StatusControllers"],
		beego.ControllerComments{
			"GetAll",
			`/all`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwapi/controllers:SystemController"] = append(beego.GlobalControllerRouter["rwapi/controllers:SystemController"],
		beego.ControllerComments{
			"GetInfo",
			`/info/:id`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwapi/controllers:UserController"] = append(beego.GlobalControllerRouter["rwapi/controllers:UserController"],
		beego.ControllerComments{
			"Post",
			`/`,
			[]string{"post"},
			nil})

	beego.GlobalControllerRouter["rwapi/controllers:UserController"] = append(beego.GlobalControllerRouter["rwapi/controllers:UserController"],
		beego.ControllerComments{
			"GetAll",
			`/`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwapi/controllers:UserController"] = append(beego.GlobalControllerRouter["rwapi/controllers:UserController"],
		beego.ControllerComments{
			"Get",
			`/:uid`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwapi/controllers:UserController"] = append(beego.GlobalControllerRouter["rwapi/controllers:UserController"],
		beego.ControllerComments{
			"Put",
			`/:uid`,
			[]string{"put"},
			nil})

	beego.GlobalControllerRouter["rwapi/controllers:UserController"] = append(beego.GlobalControllerRouter["rwapi/controllers:UserController"],
		beego.ControllerComments{
			"Delete",
			`/:uid`,
			[]string{"delete"},
			nil})

	beego.GlobalControllerRouter["rwapi/controllers:UserController"] = append(beego.GlobalControllerRouter["rwapi/controllers:UserController"],
		beego.ControllerComments{
			"Login",
			`/login`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwapi/controllers:UserController"] = append(beego.GlobalControllerRouter["rwapi/controllers:UserController"],
		beego.ControllerComments{
			"Logout",
			`/logout`,
			[]string{"get"},
			nil})

}
