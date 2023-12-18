import RegisterForm from "@/components/registration/RegisterForm";



export default function Home() {



  return (
    <main className="flex flex-col main-content items-center gap-9 px-4 md:px-20  pt-12 pb-6 bombay-bg-color cold-gray-color">
      <div className="text-center">

      <h1 className="my-6 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-900">
            Register
          </h1>

          <p className="mb-6 text-base md:text-lg lg:text-xl font-normal text-gray-500 px-4 lg:px-0">
            Register enables to save your favorite journals and search filters.
          </p>

        
        
        
        <RegisterForm   />
        
      </div>

    </main>
  );
}
