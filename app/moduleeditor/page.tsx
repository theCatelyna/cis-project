import NavBar from "@/components/NavBar";

export default function Moduleditor() {
  return (
    <>
      <div>
        <NavBar>
          <div className=" ml-8 mt-32">
            {/* Heading */}
            <div className="text-2xl mb-4">Modulwahl</div>

            {/* Description */}
            <div className="mb-4">
              Die hier ausgewählten Module werden im Stundenplan angezeigt.
            </div>

            {/* Accordeon */}
            <div></div>
          </div>
        </NavBar>
      </div>
    </>
  );
}
