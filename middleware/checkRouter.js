const checkRouter = async (req, res, next) => {
  try {
    const user = req.userId
    if (req.method !== "GET") {
      if (req.method === "POST") {
        req.body.createdBy = user || {};
        req.body.createdAt = new Date()
      } else if (req.method === "PUT") {
        const softDelete = req.originalUrl.search("soft-delete");
        if (softDelete !== -1) {
          req.body.deletedBy = user || {};
          req.body.deletedAt = new Date()
          req.body.canNotDel = true
        } else {
          req.body.updatedBy = user || {};
          req.body.updatedAt = new Date()
        }
      }
    }
    req.body.updatedBy = user || {};
    req.body.updatedAt = new Date()

    next()
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = checkRouter