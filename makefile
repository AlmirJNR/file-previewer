FRONTEND_DIR = ./frontend
BACKEND_DIR = ./Backend
CSPROJ = ./Backend.csproj
PUBLISH_FLAGS = -c Release --self-contained -p:PublishSingleFile=true \
                -p:IncludeNativeLibrariesForSelfExtract=true \
                -p:IncludeAllContentForSelfExtract=true \
                -p:DeleteExistingFiles=true
R_LINUX = linux-x64
OUTPUT_LINUX = ../$(R_LINUX)
R_WINDOWS = win-x64
OUTPUT_WINDOWS = ../$(R_WINDOWS)

all: build_frontend build_backend compact remove_build_artifacts move_to_release

build_frontend:
	(cd $(FRONTEND_DIR) && npm run build)

build_backend_linux:
	(cd $(BACKEND_DIR) && dotnet publish $(CSPROJ) $(PUBLISH_FLAGS) -r $(R_LINUX) -o $(OUTPUT_LINUX))
build_backend_windows:
	(cd $(BACKEND_DIR) && dotnet publish $(CSPROJ) $(PUBLISH_FLAGS) -r $(R_WINDOWS) -o $(OUTPUT_WINDOWS))
build_backend: build_backend_linux build_backend_windows

remove_compact_artifacts:
	rm -r ./release
compact_linux:
	(cd ./$(R_LINUX) && tar -zcvf $(OUTPUT_LINUX).tar.gz *)
compact_windows:
	(cd ./$(R_WINDOWS) && zip -r $(OUTPUT_WINDOWS).zip *)
compact: remove_compact_artifacts compact_linux compact_windows

remove_build_artifacts:
	rm -r ./$(R_LINUX) && rm -r ./$(R_WINDOWS)
move_to_release:
	mkdir -p ./release && mv *.tar.gz *.zip ./release