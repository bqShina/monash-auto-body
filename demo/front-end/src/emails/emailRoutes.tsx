import { Resend } from "resend";
import ReminderEmail from "./reminder";

const resend = new Resend(process.env.RESNED_API_KEY);

export async function sendReminder(ownerName: string, vehicleID: string) {
  resend.sendEmail({
    from: "monashautobody.dev.com",
    to: "bqshina@gmail.com",
    subject: "New Form Submitted Reminder",
    react: <ReminderEmail ownerName={ownerName} vehicleID={vehicleID} />,
  });
}
