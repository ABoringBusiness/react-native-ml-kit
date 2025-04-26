# RNMLKitObjectDetection.podspec

require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNMLKitObjectDetection"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://github.com/ABoringBusiness/react-native-ml-kit"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "ABoringBusiness" => "" }
  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/ABoringBusiness/react-native-ml-kit.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,cc,cpp,m,mm,swift}"
  s.requires_arc = true

  s.dependency "React"
  s.dependency "GoogleMLKit/ObjectDetection", "6.0.0"
end