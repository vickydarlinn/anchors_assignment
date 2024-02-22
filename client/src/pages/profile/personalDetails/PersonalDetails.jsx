import React, { useState, useContext, useEffect } from "react";
import InputComponent from "../../../components/InputElement/InputComponent";
import { useToast } from "@chakra-ui/react";
import { UserInfoContext } from "../../../context/userInfoContext";

const PersonalDetails = () => {
	const { userInfo, updateUserInfo } = useContext(UserInfoContext);
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [personalDetails, setPersonalDetails] = useState({
		name: "",
		mobile: "",
		linkedIn: "",
		github: "",
		profilePic: "",
		resume: "",
	});
	useEffect(() => {
		setPersonalDetails({
			name: userInfo?.name ? userInfo.name : "ss",
			mobile: userInfo?.mobile ? userInfo.mobile : "",
			linkedIn: userInfo?.linkedIn ? userInfo.linkedIn : "",
			github: userInfo?.github ? userInfo.github : "",
			profilePic: userInfo?.profilePic ? userInfo.profilePic : "",
			resume: userInfo?.resume ? userInfo.resume : "",
		});
	}, [userInfo]);

	const handleInputChange = (e) => {
		setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
	};

	const handleUpdateUserInfo = async (field, value, coins) => {
		setIsLoading(true);
		// Update user info in the database
		try {
			const json = await fetch(`/api/v1/users/updateProfile`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: localStorage.getItem("token"),
				},
				body: JSON.stringify({ field, value }),
			});
			const data = await json.json();
			if (!json.ok) {
				throw new Error(data.message || "Something went wrong");
			}
			toast({
				title: `${field} updated successfully`,
				description: `${field} updated successfully`,
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			updateUserInfo(data.user);
		} catch (error) {
			console.log(error);
			toast({
				title: "Error",
				description: error.message || "Something went wrong.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<main>
			<div className="flex gap-10 items-center my-6">
				<main className="flex items-start gap-4">
					<div className="flex flex-col">
						<input
							type="file"
							id="profilePic"
							accept="image/*"
							className="hidden"
						/>
						<label
							htmlFor="profilePic"
							className="text-gray-400 p-1 rounded border border-gray-600 cursor-pointer"
						>
							Choose profile pic
						</label>
						<span className="text-gray-400 text-xs pl-2">5 coins</span>
					</div>
					<button
						// onClick={onSave}
						className="bg-buttonBg font-medium text-primary p-2 px-4 rounded-lg"
					>
						Save
					</button>
				</main>

				<main className="flex items-start gap-4">
					<div className="flex flex-col">
						<input type="file" id="profilePic" className="hidden" />
						<label
							htmlFor="profilePic"
							className="text-gray-400 p-1 rounded border border-gray-600 cursor-pointer"
						>
							Choose resume
						</label>
						<span className="text-gray-400 text-xs pl-2">5 coins</span>
					</div>
					<button
						// onClick={onSave}
						className="bg-buttonBg font-medium text-primary p-2 px-4 rounded-lg"
					>
						Save
					</button>
				</main>
			</div>

			<div className="flex flex-col gap-4">
				{userInfo.name ? (
					<p>Name: {userInfo.name}</p>
				) : (
					<InputComponent
						type="text"
						placeholder="Full Name"
						coins={1}
						value={personalDetails.name}
						name={"name"}
						handler={handleInputChange}
						onSave={handleUpdateUserInfo}
					/>
				)}
				{userInfo.mobile ? (
					<p>Mobile: {userInfo.mobile}</p>
				) : (
					<InputComponent
						type="number"
						name={"mobile"}
						placeholder="Mobile"
						coins={15}
						value={personalDetails.mobile}
						handler={handleInputChange}
						onSave={handleUpdateUserInfo}
					/>
				)}
				{userInfo.linkedIn ? (
					<p>
						LinkedIn:{" "}
						<a href={userInfo.linkedIn} target="_blank" rel="noreferrer">
							{userInfo.linkedIn}
						</a>
					</p>
				) : (
					<InputComponent
						type="text"
						name={"linkedIn"}
						placeholder="LinkedIn link"
						coins={3}
						value={personalDetails.linkedIn}
						handler={handleInputChange}
						onSave={handleUpdateUserInfo}
					/>
				)}
				{userInfo.github ? (
					<p>
						Github:{" "}
						<a href={userInfo.linkedIn} target="_blank" rel="noreferrer">
							{userInfo.github}
						</a>
					</p>
				) : (
					<InputComponent
						type="text"
						name={"github"}
						placeholder="Github link"
						coins={5}
						value={personalDetails.github}
						handler={handleInputChange}
						onSave={handleUpdateUserInfo}
					/>
				)}
			</div>
		</main>
	);
};

export default PersonalDetails;
