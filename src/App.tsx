import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./App.css";

export interface Activity {
  accessibility: number;
  activity: string;
  key: string;
  link: string;
  participants: number;
  price: number;
  type: string;
  id: string;
}

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [participants, setParticipants] = useState(0);

  useEffect(() => {
    function fetchActivities() {
      if (participants === 0) {
        return;
      }
      fetch(
        "https://www.boredapi.com/api/activity?participants=" + participants
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const id = crypto.randomUUID();
          setActivities((prev) => [...prev, { ...data, id }]);
        })
        .catch((error) => console.error(error));
    }
    fetchActivities();
  }, [participants]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const peopleInput = form.elements.namedItem("people");
    const isPeopleInput = peopleInput instanceof HTMLInputElement;
    if (!isPeopleInput || isPeopleInput === null) return;
    setParticipants(Number(peopleInput.value));
    peopleInput.value = "";
  }

  function handleDelete(id: string) {
    setActivities((prev) => prev.filter((act) => act.id !== id));
  }

  return (
    <>
      <main>
        <div className="flex flex-col">
          <div className="flex">
            <form
              method="post"
              role="form"
              data-testid="add-form"
              onSubmit={handleSubmit}
            >
              <input
                type="number"
                name="people"
                id="people"
                role="people-input"
                placeholder="Nro de personas"
              />
              <button role="add-btn" type="submit">
                Añadir
              </button>
            </form>
          </div>
          <ul role="list">
            {activities.map((activity) => (
              <li key={activity.id} className="flex align-center">
                <h4> {activity.activity} </h4>
                <button onClick={() => handleDelete(activity.id)}>
                  <DeleteIcon />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
