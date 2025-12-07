import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center mt-10">
      <SignUp routing="path" path="/sign-up"/>
    </div>
  );
}
