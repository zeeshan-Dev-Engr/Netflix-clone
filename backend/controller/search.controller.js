import { User } from "../models/user.model.js";
import { fetchfromTMDB } from "../servives/TMDB_service.js";

export async function searchPerson(req, res) {
    const { query } = req.params;

    try {
        const response = await fetchfromTMDB(
            `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
        );

        if (!response.results || response.results.length === 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    Image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                }
            }
        });

        return res.json({ success: true, results: response.results });
    } catch (error) {
        console.error("Error in search person controller:", error);
        return res.status(500).json({
            success: false,
            message: "Error searching person",
            error: error.message,
        });
    }
}


export async function searchMovie(req, res) {
    const { query } = req.params;

    try {
        const response = await fetchfromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        );

        if (!response.results || response.results.length === 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    Image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createdAt: new Date(),
                }
            }
        });

        return res.json({ success: true, results: response.results });
    } catch (error) {
        console.error("Error in search movie controller:", error);
        return res.status(500).json({
            success: false,
            message: "Error searching movie",
            error: error.message,
        });
    }
}


export async function searchTv(req, res) {
    const { query } = req.params;

    try {
        const response = await fetchfromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
        );

        if (!response.results || response.results.length === 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    Image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createdAt: new Date(),
                }
            }
        });

        return res.json({ success: true, results: response.results });
    } catch (error) {
        console.error("Error in search tv controller:", error);
        return res.status(500).json({
            success: false,
            message: "Error searching tv",
            error: error.message,
        });
    }
}

export async function getsearchHistory(req, res) {
    try {
        const user = await User.findById(req.user._id).select("searchHistory").sort({ createdAt: -1 });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, content: user.searchHistory });
    } catch (error) {
        console.error("Error fetching search history:", error);
        res.status(500).send({ success: false, content: error.message });
    }
}

export async function deletesearchHistory(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id }
            }
        });
        res.status(200).json({sucess:true, content:"item deleted successfully"}) 
        
    } catch (error) {
        console.error("Error deleting search history:", error);
        res.status(500).send({sucess:false, content:error.message})
        
    }
}