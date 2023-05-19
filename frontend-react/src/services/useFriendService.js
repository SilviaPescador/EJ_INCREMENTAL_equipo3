import { useState, useEffect } from "react";
import FriendService from "./friend.service";
import authService from "./auth.service";
import Swal from "sweetalert2";

export const useFriendService = (userId) => {
	const [friendShipState, setFriendshipState] = useState(false);
	const [senderId, setSenderId] = useState(null);
	const user = authService.getCurrentUser();

	useEffect(() => {
		const fetchFriendshipStatus = async () => {
			const friendService = new FriendService();

			try {
				const response = await friendService.getFriendshipStatus(
					user.user_id,
					userId
				);
				setFriendshipState(response.status);
				setSenderId(response.sender_id);
			} catch (error) {
				console.error(error);
				setFriendshipState(null);
			}
		};

		fetchFriendshipStatus();
	}, [user.user_id, userId]);

	const handleAddFriend = async () => {
		const friendService = new FriendService();

		try {
			await friendService.sendFriendshipRequest(user.user_id, userId);
			setFriendshipState("pending");
		} catch (error) {
			console.error(error);
		}
	};

	const handleCancelRequest = async () => {
		const friendService = new FriendService();

		try {
			await friendService.cancelFriendshipRequest(user.user_id, userId);
			setFriendshipState(null);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAccept = async () => {
		const friendService = new FriendService();

		try {
			await friendService.acceptFriendshipRequest(userId, user.user_id);
			setFriendshipState("accepted");
		} catch (error) {
			console.error(error);
		}
	};

	const handleReject = async () => {
		const friendService = new FriendService();

		try {
			await friendService.rejectFriendshipRequest(userId, user.user_id);
			setFriendshipState("rejected");
		} catch (error) {
			console.error(error);
		}
	};

	const handleRemoveFriend = async () => {
		const friendService = new FriendService();

		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: "btn btn-success",
				cancelButton: "btn btn-danger",
			},
			buttonsStyling: false,
		});

		swalWithBootstrapButtons
			.fire({
				title: "¿Estás segura(o)?",
				text: "No podrás revertir esto!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Sí, borrar amigo",
				cancelButtonText: "No, cancelar",
				reverseButtons: true,
			})
			.then(async (result) => {
				if (result.isConfirmed) {
					try {
						await friendService.deleteFriendship(user.user_id, userId);
						setFriendshipState(null);
						swalWithBootstrapButtons.fire(
							"¡Amigo eliminado!",
							"El amigo ha sido eliminado.",
							"success"
						);
					} catch (error) {
						console.error(error);
					}
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					swalWithBootstrapButtons.fire(
						"Cancelado",
						"El amigo sigue siendo tu amigo :)",
						"error"
					);
				}
			});
	};

	return {
		friendShipState,
		senderId,
		handleAddFriend,
		handleCancelRequest,
		handleAccept,
		handleReject,
		handleRemoveFriend,
	};
};
