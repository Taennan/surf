
import Card from "../card";
//import landscape from "resources/images/testing/landscape.jpeg";

export default
function ExampleImageCard() {
    return (<Card
        cardType="image"
        href="https://fakecard.com/ media /image"
        title="A Fake Image Card"
        src={"http://localhost:3000/Users/Taennan/Desktop/Projects/Web/Apps/Surf/surf/src/resources/images/testing/landscape.jpeg"}
        alt="Landscape Picture"
    />);
}
