using Ganss.Xss;

namespace ShowcaseAPI.Utils;

public class HtmlSanitizerHelper
{
    public static string Sanitize(string input)
    {
        var sanitizer = new HtmlSanitizer();
        
        sanitizer.AllowedTags.Clear();
        sanitizer.AllowedTags.Add("b"); 
        sanitizer.AllowedTags.Add("strong");
        sanitizer.AllowedTags.Add("i");
        sanitizer.AllowedTags.Add("em");
        sanitizer.AllowedTags.Add("ul");
        sanitizer.AllowedTags.Add("ol");
        sanitizer.AllowedTags.Add("li");
        sanitizer.AllowedTags.Add("h1");
        sanitizer.AllowedTags.Add("h2");
        sanitizer.AllowedTags.Add("h3");
        sanitizer.AllowedTags.Add("h4");
        sanitizer.AllowedTags.Add("h5");
        sanitizer.AllowedTags.Add("h6");
        sanitizer.AllowedTags.Add("p");

        return sanitizer.Sanitize(input);
    }
}