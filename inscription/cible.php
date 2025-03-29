<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Données du formulaire</title>
    <link rel="stylesheet" href="styl.css">
</head>
<body>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>

    <div class="container">
        <div class="form-box">
            <h2>Vos informations</h2>
            
            <div class="input-group">
                <label>Prénom</label>
                <input type="text" value="<?php echo htmlspecialchars($_POST['firstName'] ?? ''); ?>" readonly>
            </div>

            <div class="input-group">
                <label>Nom</label>
                <input type="text" value="<?php echo htmlspecialchars($_POST['lastName'] ?? ''); ?>" readonly>
            </div>

            <div class="input-group">
                <label>Email</label>
                <input type="email" value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>" readonly>
            </div>

            <div class="input-group">
                <label>Numéro de téléphone</label>
                <input type="tel" value="<?php echo htmlspecialchars($_POST['phone'] ?? ''); ?>" readonly>
            </div>

            <div class="input-group">
                <label>Genre</label>
                <input type="text" value="<?php echo htmlspecialchars($_POST['gender'] ?? ''); ?>" readonly>
            </div>

            <div class="input-group">
                <label>Date de naissance</label>
                <input type="text" value="<?php echo htmlspecialchars($_POST['dob'] ?? ''); ?>" readonly>
            </div>

            <?php
            // Gestion de la photo de profil
            if (isset($_FILES['profilePic']) && $_FILES['profilePic']['error'] === UPLOAD_ERR_OK) {
                $uploadDir = 'uploads/';
                if (!file_exists($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }
                
                $fileName = basename($_FILES['profilePic']['name']);
                $uploadFile = $uploadDir . $fileName;
                
                if (move_uploaded_file($_FILES['profilePic']['tmp_name'], $uploadFile)) {
                    echo '<div class="input-group">';
                    echo '<label>Photo de profil</label>';
                    echo '<img src="' . $uploadFile . '" alt="Photo de profil" style="max-width: 200px;">';
                    echo '</div>';
                }
            }
            ?>
        </div>
    </div>
</body>
</html>