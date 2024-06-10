using Microsoft.AspNetCore.Mvc;
using WebApiTTVvs2.Model;

namespace WebApiTTVvs2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConvertToTextController : ControllerBase
    {
        private readonly ILogger<ConvertToTextController> _logger;
        public ConvertToTextController(ILogger<ConvertToTextController> logger)
        {
            _logger = logger;
        }
        [HttpGet("onChangeTextToVoice")]
        public async Task<BaseResponse> onChangeImageToText()
        {
            var result = new BaseResponse();
            try
            {

            }
            catch(Exception ex)
            {

            }
            return result;
        }
    }
}
