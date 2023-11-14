import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Track } from "~/service";

function DetailPage() {
     const { id } = useParams();

     const track = useCallback(async () => {
          const res = await Track({ id })
          console.log("🚀 ~ file: DetailPage.jsx:15 ~ track ~ res", res)
     }, [id])

     useEffect(() => { track() }, [track])

     return (
          <div>

          </div>
     );
}

export default DetailPage;