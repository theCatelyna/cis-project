import NavBar from "@/components/NavBar";
import { getAllLocations } from "@/db/location";
import Link from "next/link";

export default async function LocationPage() {
  const locations = await getAllLocations();
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());

  return (
    <>
      <NavBar>
        <div>
          <div className="text-2xl">Standorte</div>
          <div className="mb-4">
            Raumbelegungen sind für folgende Standorte verfügbar:
          </div>
          <div className="flex flex-col">
            {locations.map((location: any) =>
              location._count.rooms > 0 ? (
                <Link
                  className="p-1 text-primary"
                  key={location.id}
                  href={{
                    pathname: "/location/" + location.name.toLowerCase(),
                    query: {
                      date: date,
                    },
                  }}
                >
                  {location.name}
                </Link>
              ) : (
                <div key={location.id} className="p-1 text-neutral">
                  {location.name}
                </div>
              )
            )}
          </div>
        </div>
      </NavBar>
    </>
  );
}
