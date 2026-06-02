export const useGetUserInfo = () => {
  const getUserInfo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`);
      const responseJson = await response.json();
      return responseJson;
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      return null;
    }
  };
  return { getUserInfo };
};
