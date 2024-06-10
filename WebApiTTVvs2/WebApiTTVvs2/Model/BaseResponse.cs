using Newtonsoft.Json;

namespace WebApiTTVvs2.Model
{
    public class BaseResponse
    {
        [JsonProperty("success")]
        public bool Success { get; set; } = false;
        [JsonProperty("message")]
        public string Message { get; set; } = "success";
        [JsonProperty("data")]
        public object? Data { get; set; }
        public override string ToString() => JsonConvert.SerializeObject(this);
    }
}
