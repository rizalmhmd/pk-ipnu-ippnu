<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin - PKPT IPNU IPPNU</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-card {
            max-width: 400px;
            width: 100%;
            border: none;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }
        .card-header {
            background: linear-gradient(135deg, #008000 0%, #0000FF 100%);
            color: white;
            text-align: center;
            padding: 2rem 1rem;
            border-radius: 1rem 1rem 0 0 !important;
        }
        .login-btn {
            background: linear-gradient(135deg, #008000 0%, #0000FF 100%);
            border: none;
            color: white;
            width: 100%;
            padding: 0.75rem;
            font-weight: bold;
        }
        .login-btn:hover {
            opacity: 0.9;
            color: white;
        }
    </style>
</head>
<body>
    <div class="card login-card">
        <div class="card-header">
            <h3>Login Admin</h3>
            <p class="mb-0 small">PKPT IPNU IPPNU</p>
        </div>
        <div class="card-body p-4">
            <!-- Session Status -->
            @if (session('status'))
                <div class="alert alert-success small mb-3">
                    {{ session('status') }}
                </div>
            @endif

            <form method="POST" action="{{ route('login') }}">
                @csrf

                <!-- Email Address -->
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email') }}" required autofocus>
                    @error('email')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                    @enderror
                </div>

                <!-- Password -->
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control @error('password') is-invalid @enderror" id="password" name="password" required>
                    @error('password')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                    @enderror
                </div>

                <!-- Remember Me -->
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember_me" name="remember">
                    <label class="form-check-label" for="remember_me">Ingat Saya</label>
                </div>

                <button type="submit" class="btn login-btn mb-3">
                    MASUK
                </button>
                
                <div class="text-center">
                    <a href="{{ route('home') }}" class="text-decoration-none text-muted small">Kembali ke Beranda</a>
                </div>
            </form>
        </div>
    </div>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
