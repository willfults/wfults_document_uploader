package util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

	public static String getFormattedDate(Date date){
		DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
		String formattedDate = df.format(date);
		return formattedDate;
	}
}
