using Microsoft.AspNetCore.Mvc;

namespace worker.Controllers
{
  public class BuildRequest
  {
    public int id { get; set; }
    public Dictionary<string, string> templateParams { get; set; }
  }

  [Route("/")]
  [ApiController]
  public class AppController : ControllerBase
  {

    public AppController()
    {
    }

    [HttpPost("build")]
    public async Task<IActionResult> build(BuildRequest requestData)
    {
      await Task.CompletedTask;
      return Ok(new { success = true, buildedProject = $"Project ID {requestData.id}, Template args: {this.DictionaryToString(requestData.templateParams)}" });
    }

    public string DictionaryToString(Dictionary <string, string> dictionary) {  
      string dictionaryString = "";  
      foreach(KeyValuePair < string, string > keyValues in dictionary) {  
        dictionaryString += keyValues.Key + " = " + keyValues.Value + ", ";  
      }  
        return dictionaryString.TrimEnd(',', ' ');  
    } 
  }
}
