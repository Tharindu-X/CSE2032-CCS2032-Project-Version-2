import { Search, Play } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-[700px] flex items-center bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl"></div>
      <div className="absolute top-40 left-32 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl"></div>
      <div className="absolute top-10 right-20 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-40 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>

      {/* Wave at bottom */}
      <div className="hero-wave absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-gray-50"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-gray-50"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-gray-50"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-16 pb-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Text Content */}
          <div className="flex-1 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 mb-2 ml-14">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white font-medium text-sm ">
                #1 Job Platform in the Region
              </span>
            </div>

            {/* Main Heading */}
            {/* Main Heading */}
            <h1 className="text-[90px] font-extrabold mb-12 leading-[1.1]">
              <span className="text-gray-900">Find Your</span>
              <br />
              <span className="text-white">Dream Job</span>
              <br />
              <span className="text-gray-900">Build Your</span>
              <br />
              <span className="text-white">Future</span>
              <br />
              <span className="text-white">Career</span>
            </h1>
          </div>

        
          {/* Right Side - Description and Stats */}
          <div className="flex-1 text-left lg:text-right">
            <p className="text-white text-[20px] opacity-90 max-w-[600px] mx-auto mb-8 text-justify">
              Connect with top employers, discover amazing opportunities, and
              take the next step in your career journey. Whether you're a
              student seeking internships or a professional looking for growth,
              we've got you covered.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 lg:justify-end">
              <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-all shadow-lg hover:shadow-xl">
                <Search className="w-5 h-5" />
                Explore Jobs
              </button>
              <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-purple-600 font-semibold px-6 py-3.5 rounded-lg transition-all shadow-lg hover:shadow-xl">
                <Play className="w-5 h-5" />
                How It Works
              </button>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 min-w-[140px] border border-white/20">
                <div className="text-white text-4xl font-bold mb-1">15.0k</div>
                <div className="text-white/80 text-sm">Active Jobs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 min-w-[140px] border border-white/20">
                <div className="text-white text-4xl font-bold mb-1">2.5k</div>
                <div className="text-white/80 text-sm">Companies</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 min-w-[140px] border border-white/20">
                <div className="text-white text-4xl font-bold mb-1">50.0k</div>
                <div className="text-white/80 text-sm">Job Seekers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
