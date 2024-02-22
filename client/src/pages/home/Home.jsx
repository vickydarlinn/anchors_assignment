import React, { useContext, useEffect, useState, useRef } from "react";
import JobCard from "../../components/jobCard/JobCard";
import { UserInfoContext } from "../../context/userInfoContext";

const Home = () => {
	const { userInfo } = useContext(UserInfoContext);
	const [internshipData, setInternshipData] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [haveMoreJobs, setHaveMoreJobs] = useState(true);

	// this handler will be called when user clicks on apply button
	const getInternshipDetails = async function () {
		try {
			setIsFetching(true);
			const json = await fetch(`/api/v1/jobs/`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: localStorage.getItem("token"),
				},
			});
			const data = await json.json();
			setInternshipData((prev) => [...prev, ...data.jobs]);
			if (data.jobs.length === 0) {
				setHaveMoreJobs(false);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsFetching(false);
		}
	};

	const handleScroll = () => {
		const isAtBottom =
			window.innerHeight + Math.round(window.scrollY) >=
			document.body.offsetHeight;

		if (isAtBottom && haveMoreJobs) {
			getInternshipDetails(); // Make API call
		}
	};

	useEffect(() => {
		getInternshipDetails();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const internshipJsx =
		internshipData.length > 0
			? internshipData.map((data, i) => <JobCard key={i} data={data} />)
			: "No jobs available";

	return (
		<div className="flex flex-col items-center py-10">
			{/* only show this when user is logged in */}
			<h2 className="text-3xl">Hey, {userInfo?.name}!👋</h2>

			<h3 className="text-xl my-10">Explore Internships now</h3>
			<main className="w-[90%] max-w-[500px] flex flex-col gap-5 items-center m-auto py-5">
				{internshipJsx}
			</main>
			{isFetching ? (
				<p className="text-xl text-center font-semibold text-gray-300 py-3">
					Loading More Jobs for you......
				</p>
			) : null}
		</div>
	);
};

export default Home;
