const userPayload = process.argv[2];
const user = userPayload ? JSON.parse(userPayload) : undefined;

function describeAccess(u) {
  const roles = u?.roles ?? [];
  return roles.map((role) => role.toUpperCase()).join(", ");
}

if (!user) {
  console.log("No user payload supplied. Provide a JSON object with a 'roles' array.");
} else {
  console.log("User access:", describeAccess(user));
}
