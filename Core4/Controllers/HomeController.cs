using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Core4.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Somethingelse()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Login()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Welcome()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }


        public IActionResult VehcileList()
        {
            ViewData["Message"] = "Your application description page.";

            return PartialView();
        }


        public IActionResult appComponent()
        {
            ViewData["Message"] = "Your application description page.";

            return PartialView();
        }

        public IActionResult Charts()
        {
            ViewData["Message"] = "Your application description page.";

            return PartialView();
        }

        public IActionResult ViewVehcile()
        {
            ViewData["Message"] = "Your application description page.";

            return PartialView();
        }

        


        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Vehcile()
        {
           // ViewData["Message"] = "Your contact page.";

            return PartialView();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
