using Microsoft.AspNetCore.Mvc;
using ShowcaseAPI.Models;
using System.Net;
using System.Net.Mail;
using ShowcaseAPI.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShowcaseAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase {
        // POST api/<MailController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Contactform form) {
            form.Message = HtmlSanitizerHelper.Sanitize(form.Message);
            form.FirstName = HtmlSanitizerHelper.Sanitize(form.FirstName);
            form.LastName = HtmlSanitizerHelper.Sanitize(form.LastName);
            form.Email = HtmlSanitizerHelper.Sanitize(form.Email);
            form.Phone = HtmlSanitizerHelper.Sanitize(form.FirstName);
            form.Subject = HtmlSanitizerHelper.Sanitize(form.FirstName);
            form.Phone = HtmlSanitizerHelper.Sanitize(form.FirstName);

            if (string.IsNullOrWhiteSpace(form.Message)) {
                return BadRequest("Bericht mag niet leeg zijn na sanitization.");
            }

            var smtpClient = new SmtpClient("sandbox.smtp.mailtrap.io", 2525) {
                Credentials = new NetworkCredential("9ca676409bd0bc", "646a123c0becc7"),
                EnableSsl = true
            };
            smtpClient.Send(form.Email, "to@example.com", form.Subject, form.Message);

            return Ok("Email sent successfully");
        }
    }
}
