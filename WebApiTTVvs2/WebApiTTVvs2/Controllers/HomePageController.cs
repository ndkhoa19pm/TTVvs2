using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace WebApiTTVvs2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomePageController : ControllerBase
    {
        private readonly IFileProvider _fileProvider;

        public HomePageController(IFileProvider fileProvider)
        {
            _fileProvider = fileProvider;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var filePath = _fileProvider.GetFileInfo("index.html").PhysicalPath;

            if (System.IO.File.Exists(filePath))
            {
                var htmlContent = System.IO.File.ReadAllText(filePath);
                return Content(htmlContent, "text/html");
            }

            return NotFound();
        }
    }
}
