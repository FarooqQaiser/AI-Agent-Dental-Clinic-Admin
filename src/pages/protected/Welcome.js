import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { Link } from "react-router-dom";
// import TemplatePointers from "../../features/user/components/TemplatePointers";

function InternalPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "" }));
  }, [dispatch]);

  return (
    <div className="hero h-4/5 bg-base-200">
      <div className="hero-content p-0">
        <div className="w-full flex flex-col items-center">
          {/* <TemplatePointers /> */}
          <h1 className="text-xl text-center mt-8 font-bold">
            Welcome {user.firstName} {user.lastName} to AVA 0.1 – AI Agent
            Dashboard!!
          </h1>{" "}
          <Link to={"/app/business-management"}>
            <button className="btn bg-base-100 btn-outline mt-10">
              Get Started
            </button>
          </Link>{" "}
          {/* to="/app/dashboard"*/}
        </div>
      </div>
    </div>
  );
}

export default InternalPage;
