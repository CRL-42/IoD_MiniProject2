import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="PageNotFound">
            <h1>PAGE NOT FOUND</h1>
            <p>These aren't the Pages you're looking for. You can go about your buisness. Move to <Link to="/">home</Link></p>
        </div>
    );
}