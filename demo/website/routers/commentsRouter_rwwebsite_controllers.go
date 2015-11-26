package routers

import (
	"github.com/astaxie/beego"
)

func init() {

	beego.GlobalControllerRouter["rwwebsite/controllers:CounterController"] = append(beego.GlobalControllerRouter["rwwebsite/controllers:CounterController"],
		beego.ControllerComments{
			"Exception",
			`/counter/ex/:id`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwwebsite/controllers:CounterController"] = append(beego.GlobalControllerRouter["rwwebsite/controllers:CounterController"],
		beego.ControllerComments{
			"Business",
			`/counter/biz/:id`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwwebsite/controllers:CounterController"] = append(beego.GlobalControllerRouter["rwwebsite/controllers:CounterController"],
		beego.ControllerComments{
			"Custom",
			`/counter/custom/:id`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwwebsite/controllers:DetailController"] = append(beego.GlobalControllerRouter["rwwebsite/controllers:DetailController"],
		beego.ControllerComments{
			"Get",
			`/detail/:id`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwwebsite/controllers:MainController"] = append(beego.GlobalControllerRouter["rwwebsite/controllers:MainController"],
		beego.ControllerComments{
			"Get",
			`/home`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwwebsite/controllers:MainController"] = append(beego.GlobalControllerRouter["rwwebsite/controllers:MainController"],
		beego.ControllerComments{
			"Index",
			`/home/:id`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwwebsite/controllers:OnceDataController"] = append(beego.GlobalControllerRouter["rwwebsite/controllers:OnceDataController"],
		beego.ControllerComments{
			"GetInfo",
			`/counter/business/:id`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwwebsite/controllers:OnceDataController"] = append(beego.GlobalControllerRouter["rwwebsite/controllers:OnceDataController"],
		beego.ControllerComments{
			"Exception",
			`/counter/exception/:id`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwwebsite/controllers:OnceDataController"] = append(beego.GlobalControllerRouter["rwwebsite/controllers:OnceDataController"],
		beego.ControllerComments{
			"Customer",
			`/counter/customer/:id`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwwebsite/controllers:SystemInfoController"] = append(beego.GlobalControllerRouter["rwwebsite/controllers:SystemInfoController"],
		beego.ControllerComments{
			"GetAll",
			`/sys/:id`,
			[]string{"get"},
			nil})

	beego.GlobalControllerRouter["rwwebsite/controllers:SystemInfoController"] = append(beego.GlobalControllerRouter["rwwebsite/controllers:SystemInfoController"],
		beego.ControllerComments{
			"Index",
			`/system/:id`,
			[]string{"get"},
			nil})

}
