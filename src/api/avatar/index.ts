export const fetchAvatar = async (avatarId: string) => {
  try {
    const response = await fetch(`https://api.multiavatar.com/${avatarId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch avatar");
    }
    const data = await response.text();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching avatar:", error);
    return null;
  }
};
