export const state = () => ({
	rides: [
		{
			id: 'b1',
			title: 'Ride around the block',
			img: 'https://img.theculturetrip.com/450x/smart/wp-content/uploads/2017/02/best-road-trip-major-landmarks.png',
			distance: 21000,
			closePasses: 3,
			caloriesBurned: 315,
			description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
		},
		{
			id: 'b12',
			title: 'Out with the boys',
			img: 'https://img.theculturetrip.com/450x/smart/wp-content/uploads/2017/02/best-road-trip-major-landmarks.png',
			distance: 37000,
			closePasses: 8,
			caloriesBurned: 615,
			description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
		}
	]
});

export const mutations = {
	ADD_RIDE(state, ride) {
		state.rides.push(ride);
	},
	CLEAR_RIDES(state) {
		state.rides = [];
	}
};

export const getters = {
	getRides: state => state.rides,
	getRideById: state => (id) => state.rides.find((ride) => ride.id === id),
}

export const actions = {

};
