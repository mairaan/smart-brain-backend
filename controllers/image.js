const handleApiCall = (req, res) => {
  const sendImageToHuggingFaceWithFetch = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    const contentType = response.headers.get("content-type");

    const apiResponse = await fetch(
      "https://router.huggingface.co/hf-inference/models/facebook/detr-resnet-50",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": contentType,
        },
        body: imageBlob,
      },
    );

    const result = await apiResponse.json();
    res.json(result);
  };

  sendImageToHuggingFaceWithFetch(req.body.input);
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

export default { handleImage, handleApiCall };
