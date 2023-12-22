import RegisterForm from "@/components/registration/RegisterForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-4 md:gap-9 px-4 md:px-20  py-12 bombay-bg-color cold-gray-color">
      <div className="flex flex-col text-center w-full md:w-[40%] overflow-hidden px-3">
        <h1 className="my-6 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-900">
          Register
        </h1>

        <p className="mb-6 text-base md:text-lg lg:text-xl font-normal text-gray-500 px-4 lg:px-0">
          Register enables to save your favorite journals and search filters.
        </p>

        <RegisterForm />
      </div>
    </main>
  );
}
