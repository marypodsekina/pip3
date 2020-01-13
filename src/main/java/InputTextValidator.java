import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@FacesValidator("inputTextValidator")
public class InputTextValidator implements Validator {
    private static final String NUMBER_PATTERN =  "^[0-9]*[.,]?[0-9]+$";
    private Pattern pattern;
    public InputTextValidator(){
        pattern = Pattern.compile(NUMBER_PATTERN);
    }
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object object) throws ValidatorException {

        Matcher matcher = pattern.matcher(object.toString());
        if (!matcher.matches()) {
            FacesMessage msg = new FacesMessage("Значение не подходит.",
                    "Введено не число.");
            msg.setSeverity(FacesMessage.SEVERITY_ERROR);
            throw new ValidatorException(msg);
        }
    }
}
