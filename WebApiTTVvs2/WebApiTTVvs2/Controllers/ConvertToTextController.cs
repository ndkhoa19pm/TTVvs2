using Microsoft.AspNetCore.Mvc;
using WebApiTTVvs2.Model;
using System.Speech.Synthesis;
using UglyToad.PdfPig;
namespace WebApiTTVvs2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConvertToTextController : ControllerBase
    {
        private readonly ILogger<ConvertToTextController> _logger;
        public ConvertToTextController(ILogger<ConvertToTextController> logger)
        {
            _logger = logger;
        }

        #region Tạo file âm thanh từ text
        [HttpPost("onConvertTextToFileSound")]
        public async Task<BaseResponse> onConvertTextToFileSound(DataResponse request)
        {
            var result = new BaseResponse();
            try
            {
                // Ensure the directory exists
                var directory = Path.Combine("wwwroot", "audio");
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                // Generate audio from text
                var fileName = "OutPut_" + DateTime.Now.Ticks + ".wav";
                var outputPath = Path.Combine(directory, fileName);
                var response = await GenerateSpeechAsync(request.Description, outputPath);
                if (response.Success)
                {
                    var baseUrl = $"{Request.Scheme}://{Request.Host}";
                    var fileUrl = $"{baseUrl}/audio/{fileName}";

                    // Set the generated audio file path in the response
                    result.Message = response.Message;
                    result.Success = response.Success;
                    result.Data = fileUrl;
                }
                else
                {
                    result.Message = "Tạo file thất bại";
                    result.Success = response.Success;
                    result.Data = null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating audio file");
                result.Message = "Error generating audio file.";
                result.Success = false;
                result.Data = null;
            }
            return result;
        }

        // Method to generate speech from text and save it as a WAV file
        private async Task<BaseResponse> GenerateSpeechAsync(string text, string outputPath)
        {
            var result = new BaseResponse();
            try
            {

                using (SpeechSynthesizer synthesizer = new SpeechSynthesizer())
                {
                    synthesizer.SetOutputToDefaultAudioDevice();

                    //synthesizer.SelectVoice("Vietnamese Voice Name");
                    // or this^
                    //synthesizer.SelectVoiceByHints(VoiceGender.Neutral, VoiceAge.NotSet, 0, CultureInfo.GetCultureInfo("fr-fr"));
                    synthesizer.SetOutputToWaveFile(outputPath);
                    synthesizer.Speak(text);
                }
                result.Success = true;
                result.Message = "File được tạo thành công";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GenerateSpeechAsync");
                result.Success = false;
                result.Message = "Error generating audio file";
            }
            return result;
        }

        #endregion
        #region Chuyển file thành đoạn văn bản
        [HttpPost("onChangeFileToText")]
        public async Task<BaseResponse> onChangeFileToText([FromForm] IFormFile file)
        {
            var result = new BaseResponse();
            try
            {
                if (file == null)
                {
                    result.Message = "Vui lòng chọn file!";
                    return result;
                }
                switch (file.FileName)
                {
                    case "file.pdf":
                        var textOfPDF = await TakeChangeFilPDFToText(file);
                        result.Data = textOfPDF.Data;
                        result.Success = textOfPDF.Success;
                        result.Message = textOfPDF.Message;
                        break;
                    case "file.txt":
                        var textOfTxt = await TakeChangeFileTxtToText(file);
                        result.Data = textOfTxt.Data;
                        result.Success = textOfTxt.Success;
                        result.Message = textOfTxt.Message;
                        break;
                    default:
                        result.Data = "File được chọn không phù hợp";
                        break;
                }
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;    
            }
            return result;
        }
        private async Task<BaseResponse> TakeChangeFilPDFToText(IFormFile file)
        {
            var result = new BaseResponse();
            try
            {
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    stream.Position = 0;

                    using (var pdfDocument = PdfDocument.Open(stream))
                    {
                        using (var writer = new StringWriter())
                        {
                            foreach (var page in pdfDocument.GetPages())
                            {
                                string pageText = page.Text;
                                writer.WriteLine(pageText);
                            }
                            result.Data = writer.ToString();
                        }
                    }
                }
                result.Message = "Chuyển đổi văn bản từ file PDF thành công!";
                result.Success = true;

            }
            catch (Exception ex)
            {
                result.Message = "An error occurred while processing TXT file: " + ex.Message;
            }
            return result;
        }
        private async Task<BaseResponse> TakeChangeFileTxtToText(IFormFile file)
        {
            var result = new BaseResponse();
            try
            {
                using (var reader = new StreamReader(file.OpenReadStream()))
                {
                    string text = await reader.ReadToEndAsync();
                    result.Data = text;
                }
                result.Message = "Chuyển đổi văn bản từ file txt thành công!";
                result.Success = true;

            }
            catch(Exception ex)
            {
                result.Message = "An error occurred while processing TXT file: " + ex.Message;
            }
            return result; 
        }
        #endregion
    }
}
