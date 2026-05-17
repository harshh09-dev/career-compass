import { Link } from "react-router-dom";
import { AuthShell, AuthField } from "@/components/auth/auth-shell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the email tied to your S.Nehra account. We'll send a secure link to choose a new password."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="text-ink underline-offset-4 hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5">
        <AuthField label="Work email" type="email" placeholder="jane@company.com" />
        <button
          type="submit"
          className="w-full rounded-[14px] bg-ink px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-ink/90"
        >
          Send reset link
        </button>
      </form>
    </AuthShell>
  );
}
