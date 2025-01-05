function SignTemplate() {
  const phrases = ['Lockbase Lockbase', 'ɘƨɒdʞɔo⅃ ɘƨɒdʞɔo⅃'];

  return (
    <>
      <div className="h-full w-full bg-gradient-to-br from-indigo-800 to-orange-800 via-slate-950 flex justify-center items-center relative z-0 overflow-hidden">
        <div
          className="text-black text-8xl font-extrabold -rotate-45 scale-150 select-none text-nowrap"
          style={{ fontStretch: 'extra-expanded' }}
        >
          {Array(7)
            .fill(null)
            .map((_, index) => (
              <h1 key={index}>{phrases[index % 2]}</h1>
            ))}
        </div>
      </div>
    </>
  );
}

export default SignTemplate;
