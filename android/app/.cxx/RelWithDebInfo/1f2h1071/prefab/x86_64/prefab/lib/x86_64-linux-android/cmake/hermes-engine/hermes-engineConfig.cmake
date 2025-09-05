if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Volumes/MacExternal/User/.gradle/caches/8.10.2/transforms/980b7ff86c93301c67cd267a4469b771/transformed/jetified-hermes-android-0.76.3-release/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Volumes/MacExternal/User/.gradle/caches/8.10.2/transforms/980b7ff86c93301c67cd267a4469b771/transformed/jetified-hermes-android-0.76.3-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

