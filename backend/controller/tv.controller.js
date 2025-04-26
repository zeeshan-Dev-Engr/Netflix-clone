import { fetchfromTMDB } from '../servives/TMDB_service.js';


export async function trendingtv (req, res) {
    try {
        const data= await fetchfromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US')
        const trendingMovies = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({success:true, content: trendingMovies});
        
    } catch (error) {
        res.status(500).json({success:false, message:"Error fetching trending movies", error: error.message});
    }


}

export async function gettvtrailer(req, res) {
    const { id } = req.params; // also fixed this: it should be just `req.params`, not `req.params.id`
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        return res.json({ success: true, trailer: data });
    } catch (error) {
        if (error.message.includes('404')) {
            return res.status(404).send(null); // add return to prevent continuing
        }

        return res.status(500).json({
            success: false,
            message: "Error fetching movie trailer",
            error: error.message,
        });
    }
}

export async function gettvdetails(req, res) {
    const { id } = req.params; // also fixed this: it should be just `req.params`, not `req.params.id`
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        return res.json({ success: true, trailer: data });
    } catch (error) {
        if (error.message.includes('404')) {
            return res.status(404).send(null); // add return to prevent continuing
        }

        return res.status(500).json({
            success: false,
            message: "Error fetching movie trailer",
            error: error.message,
        });
    }

}

export async function getsimilartv(req, res) {
    const { id } = req.params; // also fixed this: it should be just `req.params`, not `req.params.id`
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        return res.json({ success: true, trailer: data });
    } catch (error) {
        if (error.message.includes('404')) {
            return res.status(404).send(null); // add return to prevent continuing
        }

        return res.status(500).json({
            success: false,
            message: "Error fetching movie trailer",
            error: error.message,
        });
    }

}

export async function gettvByCategory(req, res) {
    const { category } = req.params; // also fixed this: it should be just `req.params`, not `req.params.id`
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        return res.json({ success: true, trailer: data });
    } catch (error) {
        if (error.message.includes('404')) {
            return res.status(404).send(null); // add return to prevent continuing
        }

        return res.status(500).json({
            success: false,
            message: "Error fetching movie trailer",
            error: error.message,
        });
    }

}